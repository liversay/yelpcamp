const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6553992630884a4427759fef',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores unde velit placeat, veniam voluptatibus ex omnis vero repellat, sed corrupti voluptas assumenda quis a, quia nihil beatae aliquam enim recusandae.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfqkfx44c/image/upload/v1701547167/YelpCamp/b4ee5azaq6lcos2lanap.png',
                    filename: 'YelpCamp/b4ee5azaq6lcos2lanap',
                },
                {
                    url: 'https://res.cloudinary.com/dfqkfx44c/image/upload/v1701547171/YelpCamp/yzpfim94l1qnezzan6ai.png',
                    filename: 'YelpCamp/yzpfim94l1qnezzan6ai',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});