import React, { Fragment, useState, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import UserInfoTable from '@src/components/UserInfoTable';
import UserListTable from '@src/components/UserListTable';
import Layout from '@src/components/Layout';
import SectionHeader from '@src/components/SectionHeader';
import { useUser } from '@src/hooks';
import './Home.scss';

const Home: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const { userList: users } = useUser();

  const toggleView = (): void => {
    setIsAdminView(!isAdminView);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      toggleView();
    }
  };

  const numUsers = users.length;

  const entries =
    numUsers > 0 ? (
      users.map((user, index) => (
        <Fragment key={user.id}>
          <UserInfoTable user={user} />
          {index !== users.indexOf(users[users.length - 1]) && (
            <hr className="gray-rule" />
          )}
        </Fragment>
      ))
    ) : (
      <p>
        Let&apos;s get things started: <Link to="/new-user">click here</Link> to create a
        user.
      </p>
    );

  return (
    <Layout className="user-list">
      <SectionHeader
        title="Current Users"
        description={`${numUsers} user${numUsers !== 1 ? 's' : ''} found.`}
      />
      <FormGroup classes={{ root: 'form-group' }}>
        <FormControlLabel
          classes={{ root: 'form-control-label' }}
          control={
            <Switch
              checked={isAdminView}
              onChange={toggleView}
              onKeyPress={handleKeyPress}
              value="view"
              color="secondary"
            />
          }
          label={`Admin mode ${isAdminView ? 'enabled' : 'disabled'}.`}
        />
      </FormGroup>
      {isAdminView ? entries : <UserListTable />}
    </Layout>
  );
};

export default Home;
