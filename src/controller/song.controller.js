import { Song } from "../models/song.model.js"
import { Album } from "../models/album.model.js"

export const getAllSongs = async (req, res, next) => {
    try {
        //Sắp xếp theo thứ tự từ mới nhất đến cũ nhất
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs)
    } catch (error) {
        next(error)
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        //fetch 6 randoms songs using mongodb's aggreation pipline
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        //fetch 4 randoms songs using mongodb's aggreation pipline
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        //fetch 6 randoms songs using mongodb's aggreation pipline
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.json(songs);

    } catch (error) {
        next(error);
    }
};

export const searchSongs = async (req, res, next) => {
    try {
        const { query } = req.query;

        const songs = await Song.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { artist: { $regex: query, $options: "i" } },
            ],
        });

        const albums = await Album.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { artist: { $regex: query, $options: "i" } },
            ],
        });

        res.json({ songs, albums });
    } catch (error) {
        next(error);
    }
};