import app from "./app";
import { sequelize } from "./connection/database";

const PORT = 3000;

async function start() {

    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

start();