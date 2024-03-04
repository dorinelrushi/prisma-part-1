'use server'

import bcrypt from 'bcryptjs';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../../utilis/prisma';

export const signUp = async (email: string, password: string, name: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,

        },
    });

    if (user) {
        return 'User with that email already exists.';
    }




    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.user.create({
        data: {
            email,
            password:passwordHash, // Store the hashed password
            name, // Include the username
        },
    });

    return "Successfully created new user!";
};

export const create = async (formData: FormData) => {

    const title = formData.get("title") as string;

    if (!title.trim()) {
        return;
    }


    const author = await prisma.user.findFirstOrThrow({
        where  : {
          name : 'bb'
        },
        select: {
            id: true,
        }
    });

        if (!author) {
        throw new Error("Author not found");
    }

    await prisma.post.create({
        data: {
            title: title,
            published: true, // Assuming you want to set the default value for 'published'
            authorId: author.id,
        },
    });

    revalidatePath("/");
};