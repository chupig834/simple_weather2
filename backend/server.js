const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');

let app = express();


const mongoadd = '***'

mongoose.connect(mongoadd, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));

const MapSchema = new mongoose.Schema
({
    address: String,
    city: String,
    state: String
});

const Map = mongoose.model('Map', MapSchema);

const PORT = process.env['PORT'] || '8080';
const browserFolder = path.join(__dirname, '../dist/assig3-hw/browser');
app.use(express.static(browserFolder));
app.use(cors({ origin: '*' }));
app.use(express.json());

app.listen(PORT, () => 
{console.log(`Node server is running on http://localhost:${PORT}`);
})

/*app.get('*', (req, res) => {
    res.sendFile(path.join(browserFolder, 'index.html'));
  });*/

app.get('/api/hello/:loc', async (req, res) => 
{
    try
    {
        let address = req.params.loc;
        const [lat, lon] = address.split(',');
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    }
    catch(error)
    {
        res.status(500).json({error: "Failed to fetch geocoding data"});
    }
    
})

app.post('/api/map/cool', async (req, res) => {
    try 
    {
        let map = req.params.map;
        console.log("Hey Hey");
        console.log(req.body);
        const { address, city, state, lng, lon } = req.body;
        const newMap = new Map({ address, city, state, lng, lon });
        const saveMap = await newMap.save();
        res.status(201).json(saveMap);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
  })

  app.get('/api/nice/mapAll', async (req, res) => {
    try 
    {
        let idmap = await Map.find();
        console.log("mapResult", idmap);
        res.json(idmap);

    } catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
  })
  app.delete('/api/map/del/:id', async (req, res) => {
    try 
    {
        const dataID = req.params.id;
        const result = await Map.findByIdAndDelete(dataID);
        if (result) 
        {
          console.log('Deleted Document:', result);
        } 
        else 
        {
          console.log('No document found with the given ID');
        }
    } 
    catch (error) 
    {
        console.error('Error deleting record:', error);
    }  

  });

