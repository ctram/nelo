class EntriesController < ApplicationController
  def index
    @entries = Entry.where(user_id: current_user.id).reverse_order
  end
  
  def new
    @entry = Entry.new(user_id: current_user.id)
  end
  
  def show
    @entry = Entry.find(params[:id])
  end

  def create
    current_user.entries.create(entry_params)
    redirect_to entries_path
  end

  def update
    @entry = Entry.find(params[:id])
    @entry.update(entry_params)
    redirect_to 'entries#index'
  end

  def destroy
    Entry.find(params[:id]).destroy
  end

  private

  def entry_params
    params.require(:entry).permit(:content, :title)
  end
  
end
