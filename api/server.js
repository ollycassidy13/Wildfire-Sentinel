const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/events', async (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ error: "Start and end date are required." });
  }
  try {
    const response = await fetch(
      `https://eonet.gsfc.nasa.gov/api/v3/events?start=${start}&end=${end}&category=wildfires`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    res.json({ events: data.events || [] });
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.use(express.static(path.join(__dirname, "../client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
