	require "sinatra"
	require 'json'
	require_relative('./script')
	require 'sinatra/cross_origin'

	configure do
	  enable :cross_origin
	end

	p ENV["RACK_ENV"].nil?

	if ENV["RACK_ENV"].nil?
		$my_env = :local
	else
		$my_env = :heroku
	end

	enable :sessions
	set :root, File.dirname(__FILE__)
	set :server, %w[webrick mongrel thin]

	get "/" do

	  	erb :index
	end


	get '/fetch_books' do
		content_type :json
		data = get_books_by_age
		data.to_json
	end
