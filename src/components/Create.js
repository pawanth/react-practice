const Create = () => (
    <>
        <h1>Create/Update Blog Post</h1>
        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="csrfmiddlewaretoken" value="O9taXBWDTZuQHuUq7jX9hsPCdLzKRQVqSqjZzve5yB35mHWvF6YfVipzKhpF9q6X" />
            <p>
                <label for="id_title">Title:</label> 
                <input type="text" name="title" maxlength="120" required id="id_title" />
            </p>
            <p>
                <label for="id_content">Content:</label> 
                <textarea name="content" cols="40" rows="10" required id="id_content"></textarea>
            </p>
            <p>
                <label for="id_image">Image:</label> 
                <input type="file" name="image" accept="image/*" id="id_image" />
            </p>
            <input type="submit" value="Submit" />
        </form>
    </>
);

export default Create