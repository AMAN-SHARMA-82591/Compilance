import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskDialog from "./EditTaskDialog";
import { formatStatus } from "../../../Common/formatHelpers";

function TaskRow({ task, onDelete }) {
  return (
    <tr>
      <td className="status-cell">{formatStatus(task.status)}</td>
      <td className="title-cell">{task.title}</td>
      <td className="description-cell">{task.description}</td>
      <td className="type-cell">{formatStatus(task.type)}</td>
      <td className="actions-cell">
        <EditTaskDialog id={task._id} />
        <Button
          color="error"
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "red",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
          }}
          onClick={() => onDelete(task)}
        >
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  );
}

export default TaskRow;
