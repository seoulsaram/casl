export default function AdminHome() {
  return <div>Admin home~</div>;
}

AdminHome.acl = {
  subject: 'admin',
  action: 'read',
};
