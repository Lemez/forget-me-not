#!/usr/bin/env ruby

require 'capybara'
require 'capybara/poltergeist'
require 'capybara/dsl'

require_relative('./mail')
require_relative('./methods')
require_relative('./words')

include Capybara::DSL
Capybara.default_driver = :poltergeist
Capybara.default_selector = :css

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {:js_errors=>false
  	# ,:debug => true
  	})
end

Capybara.ignore_hidden_elements = true


def read(type)
	books = []
	book = {}

	case type
	when 'picture books'
		data = File.readlines('./books/picture-books.rb')
	when 'collections and histories'
		data = File.readlines('./books/picture-books.rb')
	when 'novels'
		data = File.readlines('./books/picture-books.rb')
	end

	data.each_with_index do |line,i|
		book[:type]=type
		case i%4
		when 0
			book[:title]=line.strip
		when 1
			book[:author]=line[0...line.index("(")].strip
			book[:year]=line[line.index("(")+1..line.index(")")-1].strip
		when 2
			book[:desc]=line.gsub("\n","")
		when 3
			book = {}
			books << book
		end
	end
	books.sort! { |a, b|  a[:year] <=> b[:year] }
end

def get_booklists

	lists = []

	for x in 416...1000 do 
		
		url = "http://www.booktrust.org.uk/books/children/booklists/#{x}/"
		list ={:id=>x,:url=>url}

		visit(url)

		list_title = page.all("h1").first.text

		if list_title.size > 50
			next
		else
			list[:title]=list_title
			File.open("./books/lists.rb","a+"){|file|file.puts(list)}

		end
	end
end

def add_desc_to_booklists
	File.readlines("./books/lists_with_books.rb").each do |list|
		obj = JSON.parse(list)
		visit obj['url']
		desc =page.all(".booklist_description p").map{|a|a.text}.join(" ")
		obj["list_description"] = desc
		File.open("./books/lists_with_books_full.rb","a+") do |file|
			file.puts(obj.to_json)
		end

	end
end

def create_lookups
	$books = {}
	File.readlines("./books/lists_with_books.rb").each do |list|
		obj = JSON.parse(list)
		
		obj['books'].each do |book|
			begin
				ra = book["reading_age"]
				age_ind = ra.index(":") + 1
				age = ra[age_ind..-1].strip
			rescue
				age = ""
			end

			key=age
			if key.include?("-")
				book['from'] = key[0..key.index("-")].to_i
				book['to'] = key[key.index("-")+1..-1].to_i
			elsif key.include?("+")
				book['from'] = key[0..key.index("+")].to_i
				book['to'] = 'not specified'
			elsif key.is_a?(Integer)
				book['from'] = key.to_i
				book['to'] = 'not specified'
			else
				book['from']='not specified'
				book['to']='not specified'
			end
			$books[book['from']] = [] if $books[book['from']].nil?
			$books[book['from']]  << book
		end
	end
	$sorted = {}
	$books.each_pair{|k,v| $sorted[k] = v.select{|t|t['title']}.uniq }

	# p "Adult: #{$sorted['not specified']}"

	# ($sorted.keys-["not specified"]).map{|b|b.to_i}.sort.each do |k|
	# 	p "------"
	# 	p "#{k}: #{$sorted[k]}"
		
	# end
	# p $books
	# p $sorted
	$sorted
end

def get_books_by_age
	create_lookups
end

def populate_booklists
	File.readlines("./books/lists.rb").each do |list|
		obj = eval(list)

		next if obj[:id].to_i <=414 

		visit(obj[:url])
		obj[:list_description]=page.all("booklist_description p").map{|a|a.text}.join(" ")
		obj[:books]=[]

		page.all("li.clearwithin").each_with_index do |li,i|

			p "Visiting #{obj[:url]} >> #{obj[:title]}, #{i}"
			book = {:img=>"",:url=>"",:title=>'',:author=>'',:description=>''}
			begin
				book[:img] = li.find("div.image a img")[:src]
				book[:url] = li.find("div.content h3 a")[:href]
				book[:title] = li.find("div.content h3 a").text
				book[:author] = li.find("div.author").text
				book[:description] = li.find("div.description").text
			rescue Capybara::ElementNotFound => e
				puts e
			end
			obj[:books] << book
		end

		obj[:books].each do |book|

				visit(book[:url])
				page.all("p.book_attribute", visible:true).each_with_index do |item, ind|
				
					if ind==0
						book[:reading_age] = item.text
					else
						book[:interest_age] = item.text
					end
				end
		end

		p obj

		File.open("./books/lists_with_books.rb","a+") do |file|
			p "Opening file"
			file.puts(obj.to_json)
		end

		sleep [4,5,6,7].sample
	end

end



def main(options={:send=>false})

	# $picture_books = read('picture books')
	# $histories = read('collections and histories')
	# $novels = read('novels')

	# populate_booklists
	# add_desc_to_booklists

	create_lookups

	# $booklists = get_booklists
	# $booklists.each{|i|puts i}

	# word = get_random_word
	# budget = URI.escape("£5-to-£10")
	# query(word,budget)


	# login_buying
	# send_data_sms
	# wait_for_new_sms
	# if $new
	# 	usage,validity,total = check_local_sms
	# 	apple_notification(usage)
	# 	mail(usage,validity, "Usage update") if options[:send]
	# end
	# delete_all_SMS


end


def get_random_word
	# RandomWord.nouns.next
	WORDS.get_random
end

def get_url(tries,word,budget)
	case tries
	when 3
			url = "https://www.hive.co.uk/Search/Childrens/#{budget}/In-Stock/Books?Keyword=#{word}&fq=121488-022-4260-01120&ipp=40&pg=1"

	when 2
			url = "https://www.hive.co.uk/Search/Childrens/In-Stock/Books?Keyword=#{word}&fq=121488-022-4260-01120&ipp=40&pg=1"

	when 1
			url = "https://www.hive.co.uk/Search/Childrens/Books?Keyword=#{word}&fq=121488-022-4260-01120&ipp=40&pg=1"

	when 0
			url = "https://www.hive.co.uk/Search/Books?Keyword=#{word}&fq=121488-022-4260-01120&ipp=40&pg=1"

	end
end

def collate(items,prices)
	items.each_with_index do |item,i|
		p "#{items[i].text}: #{prices[i].text}"
	end
end

def query(word,budget)

	$searching = true
	tries ||= 3
	p word

		begin
				url = get_url(tries, word, budget)
				visit(url)
				p tries
				@items = page.all(:css,"div.itemName h3 a", visible: true)
				if @items.length > 0 then $searching = false end

				@prices = page.all(:css,"div.purchase p.price")

		rescue
				puts 'rescueing'
				tries -= 1
				retry unless tries.zero?
		ensure
				
		end

		collate(@items,@prices) unless $searching


end






