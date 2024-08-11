import app from "./app";

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at PORT ${process.env.PORT}`);
});