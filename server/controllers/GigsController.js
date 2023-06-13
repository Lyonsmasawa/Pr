import { PrismaClient } from "@prisma/client";
import { existsSync, renameSync, unlinkSync } from "fs";

export const addGig = async (req, res, next) => {
  try {
    if (req.files) {
      console.log(req.files);
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        } = req.query;
        const prisma = new PrismaClient();

        await prisma.gigs.create({
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: req.userId } },
            images: fileNames,
          },
        });

        return res.status(201).send("Successfully created the gig.");
      }
    }
    return res.status(400).send("All properties should be filled.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserAuthGig = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { gigs: true },
    });

    return res.status(200).json({ gigs: user?.gigs });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getGigData = async (req, res, next) => {
  try {
    if (req.params.gigId) {
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.findUnique({
        where: { id: parseInt(req.params.gigId) },
      });
      return res.status(200).json({ gig });
    }
    return res.status(400).send("Gig id is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editGig = async (req, res, next) => {
  try {
    if (req.files) {
      console.log(req.files);
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        } = req.query;
        const prisma = new PrismaClient();

        const oldData = await prisma.gigs.findUnique({
          where: {id: parseInt(req.params.gigId)}
        })

        await prisma.gigs.update({
          where: {id: parseInt(req.params.gigId)},
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: req.userId } },
            images: fileNames,
          },
        });

        oldData?.images.forEach(image => {
          if (existsSync(`uploads/${image}`)) unlinkSync(`uploads/${image}`)
        }) 

        return res.status(200).send("Successfully updated the gig.");
      }
    }
    return res.status(400).send("All properties should be filled.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const searchGigs = async (req, res, next) => {
  try {
    if (req.query.searchTerm || req.query.category) {
      const prisma = new PrismaClient();
      const gigs = await prisma.gigs.findMany(
        createSearchQuery(req.query.searchTerm, req.query.category)
      );
      return res.status(200).json({ gigs });
    }
    return res.status(400).send("searchTerm or category is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR:[]
    },
    include: {
      createdBy: true,
    }
  }
  if (searchTerm) {
    query.where.OR.push({
      title: {contains: searchTerm, mode: "insensitive"}
    })
  }
  if (category) {
    query.where.OR.push({
      title: {contains: category, mode: "insensitive"}
    })
  }
  return query
}
