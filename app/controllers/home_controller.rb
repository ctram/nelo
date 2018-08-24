class HomeController < ApplicationController
  def index
    @entries = Entry.privacy_public.reverse_order
    @messages = Message.privacy_public.reverse_order
  end
end
