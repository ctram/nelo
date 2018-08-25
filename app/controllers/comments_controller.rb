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
    @comment.save!
    redirect_to entry_path(@comment.entry)
  end
  
  def edit
    @comment = Comment.find(params[:id])
    can? :edit, @comment
  end

  def update
    @comment = Comment.find(params[:id])
    can? :update, @comment
    @comment.update(message_params)
    render :show
  end

  def show
    @comment = Comment.find(params[:id])
    can? :read, @comment
  end

  def destroy
    @comment = Comment.find(params[:id])
    entry = @comment.entry
    can? :destroy, @comment
    @comment.destroy
    redirect_to entry_path(entry)
  end

  private 

  def message_params
    params.require(:comment).permit(:content, :privacy_level, :author_id, :recipient_id, :entry_id)
  end
end