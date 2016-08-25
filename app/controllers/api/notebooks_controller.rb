class Api::NotebooksController < ApplicationController
  def index
    # @notebooks = Notebook.all
    @notebooks = Notebook.where(user_id: current_user.id)
    render json: @notebooks
  end

  def user_index
    @notebooks = Notebook.where(user_id: current_user.id)
    render json: @noteboks
  end

  def new
    @notebook = Notebook.new
    render json: @notebook
  end

  def show
    @notebook = Notebook.find(params[:id])
    # render json: @notebook
    render "api/notebooks/show"
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    id = @notebook.id
    @notebook.destroy!
    render json: id
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    @notebook.update_attributes!(notebook_params)

    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors, status: 422
    end
  end

  private
	def notebook_params
		params.require(:notebook).permit(:title, :user_id)
	end
end
