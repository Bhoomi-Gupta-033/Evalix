// import { requireAuth } from "@clerk/express";
// import User from "../models/User.js";

// export const protectRoute = [
//   requireAuth(),
//   async (req, res, next) => {
//     try {
//       const clerkId = req.auth.userId;

//       if (!clerkId)
//         return res
//           .status(401)
//           .json({ message: "Unauthorized - invalid token" });

//       // find user in db by clerk ID
//       const user = await User.findOne({ clerkId });

//       if (!user) return res.status(404).json({ message: "User not found" });

//       // attach user to req
//       req.user = user;

//       next();
//     } catch (error) {
//       console.error("Error in protectRoute middleware", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   },
// ];

import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let user = await User.findOne({ clerkId });

      // agar user DB me nahi hai to create karo
      if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkId);

        user = await User.create({
          clerkId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: clerkUser.firstName + " " + clerkUser.lastName,
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
