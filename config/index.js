import "dotenv/config";
const { env } = process;

export const config = {
    PORT: env.PORT,
    KEY: env.SECRET_KEY,
};

 