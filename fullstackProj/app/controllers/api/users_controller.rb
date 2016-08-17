class Api::UsersController < ApplicationController
  def new
		@user = User.new
		render json: @user
	end

	def show
		@user = User.find(params[:id])
		# render json: @user
		# render "api/users/show"
    render :show
	end

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			# render "api/users/show"
      render :show
		else
			render json: @user.errors, status: 422
		end
	end

	def update
		@user = User.find(params[:id])
		@user.update_attributes!(user_params)
		if @user.save
			# render "api/users/show"
      render :show
		else
			render json: @user.errors, status: 422
		end
	end

	private
	def user_params
		params.require(:user).permit(:email, :password)
	end

end
