/*
Twitch API Client Wrapper

Usage:
    const Twitch = require('./modules/Twitch.js');
    const twitch = new Twitch();
    twitch.getT2Streams();

Game IDs:
    T2 = 2598
    Fortnite = 33214   // because theres always a fortnite stream..


 Example Response:
{
    data: [
        {
        id: '40951859305',
        user_id: '72545968',
        user_login: 'tacodechoco',
        user_name: 'TacoDeChoco',
        game_id: '2598',
        game_name: 'Tribes 2',
        type: 'live',
        title: 'Tribes 2',
        viewer_count: 0,
        started_at: '2023-02-19T18:37:55Z',
        language: 'en',
        thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_tacodechoco-{width}x{height}.jpg',
        tag_ids: [],
        tags: [Array],
        is_mature: false,
        getThumbnailUrl: [Function (anonymous)]
        }
    ],
    pagination: {
        cursor: 'eyJiIjp7IkN1cnNvciI6ImV5SnpJam94TmpjMk9ETXhPRGMxTGpNNU9URTVOakVzSW1RaU9tWmhiSE5sTENKMElqcDBjblZsZlE9PSJ9LCJhIjp7IkN1cnNvciI6IiJ9fQ'
    }
}  

*/


const TwitchApi = require("node-twitch").default;

class Twitch {
  constructor() {
        this.client_id = process.env.TWITCH_CLIENT_ID;
        this.client_secret = process.env.TWITCH_SECRET;
        this.gameId = "2598"; // needs to be a string for the API wrapper :p
        
        this.twitch = new TwitchApi({
            client_id: this.client_id,
            client_secret: this.client_secret
        });
    }

    async getSteamerInfo(user_id){
        const streamer = await this.twitch.getStreams({user_id: user_id});
        return streamer
    }

    
    async getT2Streams(){
        const streams = await this.twitch.getStreams({game_id: this.gameId});
        console.log(streams);
        return streams
    }
}

module.exports = Twitch;