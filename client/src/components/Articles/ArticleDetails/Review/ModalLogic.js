export const getModalMessage = (method) => {
    let message = "An error occurred! Try again later.";
    let type = "error";  // by default

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
