export const getModalMessage = (method,message="An error occurred! Try again later.",type="error") => {
    switch (method) {
        case "DELETE":
            message = "Review deleted successfully!";
            type = "success";
            break;
        case "PUT":
            message = "Review updated successfully!";
            type = "success";
            break;
        case "POST":
            message = "Review added successfully!";
            type = "success";
            break;
    }

    return { message, type };
}
