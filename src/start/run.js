import { connect } from "mongoose";

import {config} from "../../config/index.js"

const port = config.PORT

export const run = (app) => {
    try {
    connect(`mongodb://127.0.0.1:27017/exam`)
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
    });

    } catch (error) {
        console.log(error);
    }
};
