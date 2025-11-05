// firebase.ts (mock-safe)
// If you want to use real Firebase later, replace this file with actual firebase initializeApp code.

type MockAuth = {
  currentUser: any;
  // minimal API used by your app:
  signOut: () => Promise<void>;
  onAuthStateChanged: (cb: (user: any) => void) => (() => void);
};

type MockDatabase = {
  // a super simple in-memory DB with get/set and listeners
  _data: Record<string, any>;
  ref: (path: string) => { on: (event: string, cb: (snap: any) => void) => void; set: (v: any) => void; once: (ev: string) => Promise<any> };
};

const auth: MockAuth = {
  currentUser: null,
  signOut: async () => { auth.currentUser = null; },
  onAuthStateChanged: (cb) => {
    // call immediately with null (not logged in)
    setTimeout(() => cb(auth.currentUser), 0);
    // return unsubscribe (no-op)
    return () => {};
  }
};

const database: MockDatabase = {
  _data: {},
  ref: (path: string) => {
    return {
      on: (_event: string, cb: (snap: any) => void) => {
        // call callback with a snapshot-like object
        const val = database._data[path] ?? null;
        cb({ val: () => val });
      },
      set: (v: any) => { database._data[path] = v; },
      once: async (_ev: string) => ({ val: () => database._data[path] ?? null })
    };
  }
};

export { auth, database };
export default { auth, database };
