# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# require 'date'

SCRIPT_ROOT = "/Users/JW/Websites/forget_me_not"

set :output, "#{SCRIPT_ROOT}/log/cron_log.log"
#
# with sending mail update
every 2.days do
	# command "echo '*************'"
	# command "ruby -r '#{SCRIPT_ROOT}/script.rb' -e 'main({:send=>true})'"
end

# without sending mail update
every 2.hours do
	# command "echo '*************'"
	# command "ruby -r '#{SCRIPT_ROOT}/script.rb' -e 'main({:send=>false})'"
end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
