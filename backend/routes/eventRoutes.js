router.get("/search", async (req, res) => {
  try {
    const {
      keyword,
      category,
      startDate,
      endDate,
      minPrice,
      maxPrice,
      seatsLeft,
      organizer,
    } = req.query;

    const filter = {};

    // Keyword (title + location)
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ];
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Date Range
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // Price Range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Seats Left
    if (seatsLeft) {
      filter.seatsLeft = { $gte: Number(seatsLeft) };
    }

    // Organizer Name
    if (organizer) {
      filter.organizerName = { $regex: organizer, $options: "i" };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.json(events);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
