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
    raise 'Author can only be the current user' if message_params[:author_id] != current_user.id
    @message = Message.create(message_params)
    # redirect to origin url
    redirect_to entries_path
  end

  def update
    @message = Message.find(params[:id])
    @message.update(message_params)
  end

  def show
    @message = Message.find(params[:id])
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    # TODO: redirect to origin url
    redirect_to 'entries#index'
  end

  private 

  def message_params
    params.require(:message).permit(:content, :privacy_level, :author_id, :recipient_id)
  end
end