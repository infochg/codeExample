import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Pagination from '@material-ui/lab/Pagination';

import MembershipForm from './MembershipForm';

import icoEdit from '../../assets/images/icons/ico-edit.svg';
import icoAdd from '../../assets/images/icons/ico-add.svg';
import icoTrash from '../../assets/images/icons/ico-trash.svg';

import {
  MEMBERSHIP_ADD_REQUEST,
  MEMBERSHIP_UPDATE_REQUEST,
  MEMBERSHIP_DELETE_REQUEST,
  GET_ALL_MEMBERSHIPS_REQUEST,
} from '../../redux/actions/actionTypes';

const typeColor = {
  recurring: '#60BF42',
  fixed: '#FF9000',
};

function Memberships(props) {
  const { addMembership, updateMembership, deleteMembership, getAllMemberships, allMemberships } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [membershipData, setMembershipData] = useState();

  // Pagination
  const [activePage, setActivePage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (allMemberships) {
      setPagesCount(Math.ceil(allMemberships.length / itemsPerPage));
    }
  }, [allMemberships, itemsPerPage]);
  useEffect(() => {
    if (activePage > pagesCount) {
      setActivePage(1);
    }
  }, [pagesCount, activePage]);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  // Get Memberships List
  useEffect(() => {
    getAllMemberships();
  }, [getAllMemberships]);

  // Add/Update Membership
  const openDialog = data => {
    if (data.name) {
      setMembershipData(data);
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setMembershipData(undefined);
  };

  const submit = values => {
    if (membershipData) {
      const updatingData = membershipData;
      // eslint-disable-next-line
      updatingData.id = membershipData['_id'];
      // eslint-disable-next-line no-return-assign
      Object.keys(values).map(item => (updatingData[item] = values[item]));
      updateMembership(updatingData);
    } else {
      addMembership(values);
    }
    closeDialog();
  };

  // Delete Membership
  const openDeleteDialog = data => {
    setMembershipData(data);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setMembershipData(undefined);
  };

  const confirmDelete = () => {
    // eslint-disable-next-line
    deleteMembership({ id: membershipData['_id'] });
    closeDeleteDialog();
  };

  return (
    <div className="memberships">
      <div className="page-title">
        <h1>Memberships</h1>
      </div>
      <Paper className="paper">
        <Table stickyHeader className="table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="th" />
              <TableCell className="th">
                <span>Name</span>
              </TableCell>
              <TableCell className="th">
                <span>Type</span>
              </TableCell>
              <TableCell className="th">
                <span>Cost</span>
              </TableCell>
              <TableCell className="th">
                <span className="text-center">Actions</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {allMemberships.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((row, index) => (
              <TableRow key={row.name}>
                <TableCell className="cell" style={{ textAlign: 'center' }}>
                  <span># {index + 1}</span>
                </TableCell>
                <TableCell className="cell">
                  <span>{row.name}</span>
                </TableCell>
                <TableCell className="cell" style={{ color: typeColor[row.type] }}>
                  <span>{row.type}</span>
                </TableCell>
                <TableCell className="cell">
                  <span>${row.amount}</span>
                </TableCell>
                <TableCell className="cell">
                  <div className="action-icons">
                    <div className="action-icon" role="presentation" onClick={() => openDialog(row)}>
                      <img src={icoEdit} alt="" className="edit-ico" />
                    </div>
                    <div className="action-icon" role="presentation" onClick={() => openDeleteDialog(row)}>
                      <img src={icoTrash} alt="" className="edit-ico" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="add-ico" role="presentation" onClick={openDialog}>
          <img src={icoAdd} alt="" />
        </div>
      </Paper>

      {pagesCount !== 1 ? (
        <div className="pagination-wrapper">
          <Pagination count={pagesCount} page={activePage} onChange={handlePageChange} />
        </div>
      ) : null}

      <Dialog open={isDialogOpen} onClose={closeDialog} className="memberships-dialog">
        <DialogTitle>{membershipData ? 'Update Membership' : 'Add Membership'}</DialogTitle>
        <DialogContent>
          <MembershipForm initialValues={membershipData} closeDialog={closeDialog} onSubmit={submit} />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} className="memberships-dialog">
        <DialogTitle>Delete Membership</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this Membership?</p>
          <div className="text-center customForm">
            <button type="button" onClick={closeDeleteDialog} className="submit-button cancel-button">
              No
            </button>
            <button type="button" className="submit-button" onClick={confirmDelete}>
              Yes
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

Memberships.propTypes = {
  addMembership: PropTypes.func,
  updateMembership: PropTypes.func,
  deleteMembership: PropTypes.func,
  getAllMemberships: PropTypes.func,
  allMemberships: PropTypes.arrayOf(PropTypes.shape({})),
};

Memberships.defaultProps = {
  addMembership: undefined,
  updateMembership: undefined,
  deleteMembership: undefined,
  getAllMemberships: undefined,
  allMemberships: undefined,
};

const mapStateToProps = state => ({
  loading: state.loading,
  allMemberships: state.allMemberships,
});

const actionsStateToProps = {
  addMembership: data => ({ type: MEMBERSHIP_ADD_REQUEST, data }),
  updateMembership: data => ({ type: MEMBERSHIP_UPDATE_REQUEST, data }),
  deleteMembership: id => ({ type: MEMBERSHIP_DELETE_REQUEST, id }),
  getAllMemberships: () => ({ type: GET_ALL_MEMBERSHIPS_REQUEST }),
};

export default connect(mapStateToProps, actionsStateToProps)(Memberships);
