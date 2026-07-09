const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const regularHours = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

async function getAvailableTimes(req, res){
    const date = req.body.date;
    const dayStart = new  Date(date);
    dayStart.setHours(0,0,0,0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const bookedTimes = [];
    const availableHours = [];

    try{
        const bookings = await Booking.find({startsAt: {$gte: dayStart, $lt: dayEnd}});
        bookings.forEach(booking => {
            const rawTime = booking.startsAt.toTimeString();
            const time = rawTime.slice(0, 5);
            bookedTimes.push(time);
        });

        if(!bookedTimes){
            availableHours.push(regularHours);
        }else{
            regularHours.forEach(regularHour => {
                if(!bookedTimes.includes(regularHour)){
                    availableHours.push(regularHour);
                }
            })
        }

        res.status(200).json(availableHours);
    }catch(e){
        console.log(e.message)
        res.status(500).send();
    }
    
};

async function bookTime(req, res){
    const {startsAt} = req.body;
    const userId = req.session.userId;

    try{
        const booking = await Booking({user: userId, startsAt: startsAt});
        await booking.save();
        res.status(200).send();
    }catch(e){
        console.log(e.message);
        res.status(500).send();
    }
}

module.exports = {getAvailableTimes, bookTime};