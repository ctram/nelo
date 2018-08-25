require_relative '../entities/entry_entity'
require_relative '../entities/message_entity'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    if signed_in?
      @entries = Entry.with_user_entries(current_user).reverse_order
      @messages = Message.with_user_messages(current_user).reverse_order
    else
      @entries = Entries.privacy_public.reverse_order
      @messages = Messages.privacy_public.reverse_order
    end
    
    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @messages = API::Entities::MessageEntity.represent(@messages).as_json
  end
end
