require_relative '../entities/entry_entity'
require_relative '../entities/comment_entity'

class HomeController < ApplicationController
  skip_before_action :redirect_if_not_logged_in
  
  def index
    if signed_in?
      @entries = Entry.with_user_entries(current_user).reverse_order
      @comments = Comment.with_user_comments(current_user).reverse_order
    else
      @entries = Entry.privacy_public.reverse_order
      @comments = Comment.privacy_public.reverse_order
    end
    
    @entries = API::Entities::EntryEntity.represent(@entries).as_json
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end
end
