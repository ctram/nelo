class HomeController < ApplicationController
  def index
    length = Entry.all.length
    start_idx = length - 10 > 0 ? length - 10 : 0
    @entries = Entry.all.slice(start_idx, length)
  end
end
