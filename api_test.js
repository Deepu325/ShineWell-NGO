const axios = require('axios');
(async () => {
    try {
        const login = await axios.post('http://localhost:5000/api/auth/login', { email: 'admin@shinewellngo.org', password: 'password123' });
        console.log('Login OK, token length', login.data.token.length);
        const token = login.data.token;
        const headers = { Authorization: `Bearer ${token}` };
        const gallery = await axios.get('http://localhost:5000/api/gallery');
        console.log('Gallery GET OK, count', gallery.data.count);
        const blogs = await axios.get('http://localhost:5000/api/blogs');
        console.log('Blogs GET OK, count', blogs.data.count);
        const donations = await axios.get('http://localhost:5000/api/donations', { headers });
        console.log('Donations GET OK');
        const volunteers = await axios.get('http://localhost:5000/api/volunteers', { headers });
        console.log('Volunteers GET OK');
        const campaigns = await axios.get('http://localhost:5000/api/campaigns');
        console.log('Campaigns GET OK');
        const impact = await axios.get('http://localhost:5000/api/impact');
        console.log('Impact GET OK');
    } catch (err) {
        console.error('Error during API test', err.response ? err.response.data : err.message);
    }
})();
