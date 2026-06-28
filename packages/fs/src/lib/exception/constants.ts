export const FS_ERRORS = {
  BUSY: {
    code: "BUSY_ERROR",
    errnoCode: "EBUSY",
  },
  NO_ENTRY: {
    code: "NO_ENTRY_ERROR",
    errnoCode: "ENOENT",
  },
} as const;
