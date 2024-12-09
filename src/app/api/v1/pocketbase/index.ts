import PocketBase from 'pocketbase';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTczMzg2NjU4MiwiaWQiOiJ2MXE5MzV4MWdmYjJmaTEiLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.ofpoCm7dcvHKuzFESoQX85DXDnBVQJBOVQftLm5kQOA"
const pb = new PocketBase('http://127.0.0.1:8090');
pb.authStore.save(token, null);

export { pb };