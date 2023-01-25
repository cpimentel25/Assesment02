import { NextFunction, Request, Response } from "express";
import { getUser } from "../../api/user/user.services";
import { singToken } from '../auth.service';

export async function handleLoginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Email o Password invalido' });
    }

    const payload = user.profile;

    const token = singToken(payload);

    return res.status(200).json({ profile: user.profile, token });

  } catch (error) {
    return res.status(500).json(error.message);
  };
};
