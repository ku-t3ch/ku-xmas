import PocketBase from 'pocketbase';

const token = process.env.PB_TOKEN as string;
const pb = new PocketBase('http://127.0.0.1:8090');
pb.authStore.save(token, null);

export { pb };