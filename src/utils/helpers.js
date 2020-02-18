export const isExist = (valuesAray, value) => valuesAray.indexOf(value) === -1;

export const getDate = date => {
  const showDate = new Date(date);
  return showDate.toLocaleDateString('en-US');
};

export const getMembershipData = (membershipsArray, membershipId) => {
  // eslint-disable-next-line
  const membershipItem = membershipsArray.filter(item => item['_id'] === membershipId)[0];
  if (membershipItem) {
    return { name: membershipItem.name, id: membershipId };
  }
  return { name: '', id: membershipId };
};
