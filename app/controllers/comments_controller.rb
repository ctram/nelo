class CommentsController < ApplicationController
  skip_before_action :redirect_if_not_logged_in, except: [:index, :show]
  
  def index
    user = User.find(params[:user_id])

    if current_user == user
      @comments = current_user.comments.reverse_order
    elsif signed_in?
      @comments = user.viewable_comments_for(current_user).reverse_order
    else
      @comments = user.comments.privacy_public.reverse_order
    end
    
    @comments = API::Entities::CommentEntity.represent(@comments).as_json
  end

  def new
    @comment = Comment.new
  end
  
  def create
    @comment = Comment.new(message_params)
    can? :create, @comment
    @comment.save
    # redirect to origin url
    redirect_to entries_path
  end

  def update
    @comment = Comment.find(params[:id])
    can? :update, @comment
    @comment.update(message_params)
  end

  def show
    @comment = Comment.find(params[:id])
    can? :read, @comment
  end

  def destroy
    @comment = Comment.find(params[:id])
    can? :destroy, @comment
    @comment.destroy
    # TODO: redirect to origin url
    redirect_to 'entries#index'
  end

  private 

  def message_params
    params.require(:comment).permit(:content, :privacy_level, :author_id, :recipient_id)
  end
end