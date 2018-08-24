class MessagesController < ApplicationController
  def index
    if params[:user_id] 
      user = User.find(params[:user_id])
      return render json: API::Entities::MessageEntity.represent(user.public_messages(params[:type]))
    end

    render json: API::Entities::MessageEntity.represent(Message.privacy_public.reverse_order)
  end

  def new
    @message = Message.new
  end
  
  def create
    @message = Message.new(message_params)
    can? :create, @message
    @message.save
    # redirect to origin url
    redirect_to entries_path
  end

  def update
    @message = Message.find(params[:id])
    can? :update, @message
    @message.update(message_params)
  end

  def show
    @message = Message.find(params[:id])
    can? :read, @message
  end

  def destroy
    @message = Message.find(params[:id])
    can? :destroy, @message
    @message.destroy
    # TODO: redirect to origin url
    redirect_to 'entries#index'
  end

  private 

  def message_params
    params.require(:message).permit(:content, :privacy_level, :author_id, :recipient_id)
  end
end