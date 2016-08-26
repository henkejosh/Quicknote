# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

guest = User.create!(email: "guest_user", password: "password")

notebook1 = Notebook.create!(title: "Sample Notebook", user_id: guest.id)
notebook2 = Notebook.create!(title: "To-Do List", user_id: guest.id)

note1 = Note.create!(
  notebook_id: notebook1.id,
  title: "How to create a note:",
  body: "1. Type your things.
      2. Click create"
)

note2 = Note.create!(
  notebook_id: notebook2.id,
  title: "Go to grocery store",
  body: "Pickup: 1) Milk 2) Eggs 3) Cheese 4) Fruit"
)

tag1 = Tag.create!(
  title: "to-do"
)

tag2 = Tag.create!(
  title: "sample-tag"
)

tag3 = Tag.create!(
  title: "Grocery"
)
