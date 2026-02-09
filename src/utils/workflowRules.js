const workflow = {
  RECEIVED: ["VALIDATED", "REJECTED"],
  VALIDATED: ["QUEUED", "REJECTED"],
  QUEUED: ["PROCESSED", "REJECTED"],
  PROCESSED: [],
  REJECTED: []
};

const canTransition = (currentStatus, newStatus) => {
  return workflow[currentStatus]?.includes(newStatus);
};

module.exports = {
  canTransition
};
