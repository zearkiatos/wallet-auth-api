const userMapper = ({
  updated_at,
  created_at,
  ...userRest
}: any) => ({
  ...userRest,
  updatedAt: updated_at,
  createdAt: created_at
});

export { userMapper };
