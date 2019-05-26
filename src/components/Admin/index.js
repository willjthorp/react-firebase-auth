import React from 'react'
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

const AdminPage = () => (
  <div> 
    <h1>Admin</h1>
    <p>
      Restricted!
    </p>
  </div>
)

const condition = authUser => authUser && Boolean(authUser.roles[ROLES.ADMIN]);

export default withAuthorization(AdminPage, condition)
