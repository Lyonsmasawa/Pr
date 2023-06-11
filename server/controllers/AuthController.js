import { PrismaClient, Prisma } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { renameSync } from "fs";
import jwt from "jsonwebtoken";

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.create({
        data: {
          email,
          password: await generatePassword(password),
        },
      });
      // return res.cookie("jwt", createToken(email, user.id), {
      //     httpOnly: false,
      //     maxAge: maxAge * 1000,
      // }).status(201).json({ user: { id: user.id, email: user.email } })
      return res.status(201).json({
        user: { id: user.id, email: user.email },
        jwt: createToken(email, user.id),
      });
    }
    return res.status(400).send("Email and password required");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error.");
  }
};

export const Login = async (req, res, next) => {
  console.log(req.body);
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(400).send("User not found!");
      }
      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(400).send("Invalid password!");
      }
      return res.status(200).json({
        user: { id: user.id, email: user.email },
        jwt: createToken(email, user.id),
      });
    }
    return res.status(400).send("Email and password required");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getUserInfo = async (req, res, next) => {
  console.log(req.userId);
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });
      delete user.password;
      console.log(user);
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error.");
  }
};

export const setUserInfo = async (req, res, next) => {
  console.log(req.userId);
  try {
    if (req.userId) {
      const { userName, fullName, description } = req.body;
      if ((userName, fullName, description)) {
        const prisma = new PrismaClient();
        const userNameValid = await prisma.user.findUnique({
          where: { username: userName },
        });
        if (userNameValid) {
          return res.status(200).json({ userNameError: true });
        }
        await prisma.user.update({
          where: { id: req.userId },
          data: {
            username: userName,
            fullName,
            description,
            isProfileInfoSet: true,
          },
        });
        return res.status(200).send("Profile data updated successfully");
      } else {
        return res
          .status(400)
          .send("Username, Full Name & Description should be included");
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({ userNameError: true });
      }
    } else {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    }
  }
};

export const setUserImage = async (req, res, next) => {
  console.log(req.userId);
  try {
    if (req.file) {
      if (req?.userId) {
        console.log(req.file);
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const prisma = new PrismaClient();
        await prisma.user.update({
          where: { id: req.userId },
          data: { profileImage: fileName },
        });
        return res.status(200).json({ img: fileName });
      }
      return res.status(400).send("Cookie error");
    }
    return res.status(400).send("Image not included");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error.");
  }
};