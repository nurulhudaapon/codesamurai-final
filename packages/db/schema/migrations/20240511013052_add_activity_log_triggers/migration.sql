-- Create the activity log table
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(255) NOT NULL,
    action VARCHAR(10) NOT NULL,
    user_id text,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the trigger function
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
DECLARE
    user_id_value INT;
BEGIN
    -- Check if the column exists in the NEW row
    IF TG_OP = 'INSERT' AND TG_TABLE_NAME::regclass::text LIKE '%created_by_user_id%' THEN
        user_id_value := NEW.created_by_user_id::text;
    ELSE
        user_id_value := NULL;
    END IF;

    -- Insert into the activity log
    INSERT INTO activity_log (table_name, action, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, user_id_value);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the insert trigger
CREATE TRIGGER user_insert_trigger
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger
CREATE TRIGGER user_update_trigger
AFTER UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger
CREATE TRIGGER user_delete_trigger
AFTER DELETE ON "user"
FOR EACH ROW

EXECUTE FUNCTION log_activity();-- This is an empty migration.


-- Create the insert trigger
CREATE TRIGGER issue_insert_trigger
AFTER INSERT ON post
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger
CREATE TRIGGER post_update_trigger
AFTER UPDATE ON post
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger
CREATE TRIGGER post_delete_trigger
AFTER DELETE ON post
FOR EACH ROW
EXECUTE FUNCTION log_activity();-- This is an empty migration.



-- Create the insert trigger
CREATE TRIGGER issue_insert_trigger
AFTER INSERT ON issue
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger
CREATE TRIGGER issue_update_trigger
AFTER UPDATE ON issue
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger
CREATE TRIGGER issue_delete_trigger
AFTER DELETE ON issue
FOR EACH ROW
EXECUTE FUNCTION log_activity();-- This is an empty migration.


-- Create the insert trigger for blocked_words
CREATE TRIGGER blocked_words_insert_trigger
AFTER INSERT ON blocked_words
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for blocked_words
CREATE TRIGGER blocked_words_update_trigger
AFTER UPDATE ON blocked_words
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for blocked_words
CREATE TRIGGER blocked_words_delete_trigger
AFTER DELETE ON blocked_words
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for contractor_company
CREATE TRIGGER contractor_company_insert_trigger
AFTER INSERT ON contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for contractor_company
CREATE TRIGGER contractor_company_update_trigger
AFTER UPDATE ON contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for contractor_company
CREATE TRIGGER contractor_company_delete_trigger
AFTER DELETE ON contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for landfill
CREATE TRIGGER landfill_insert_trigger
AFTER INSERT ON landfill
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for landfill
CREATE TRIGGER landfill_update_trigger
AFTER UPDATE ON landfill
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for landfill
CREATE TRIGGER landfill_delete_trigger
AFTER DELETE ON landfill
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for notification
CREATE TRIGGER notification_insert_trigger
AFTER INSERT ON notification
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for notification
CREATE TRIGGER notification_update_trigger
AFTER UPDATE ON notification
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for notification
CREATE TRIGGER notification_delete_trigger
AFTER DELETE ON notification
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for notification_read
CREATE TRIGGER notification_read_insert_trigger
AFTER INSERT ON notification_read
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for notification_read
CREATE TRIGGER notification_read_update_trigger
AFTER UPDATE ON notification_read
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for notification_read
CREATE TRIGGER notification_read_delete_trigger
AFTER DELETE ON notification_read
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for permission
CREATE TRIGGER permission_insert_trigger
AFTER INSERT ON permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for permission
CREATE TRIGGER permission_update_trigger
AFTER UPDATE ON permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for permission
CREATE TRIGGER permission_delete_trigger
AFTER DELETE ON permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();


-- Create the insert trigger for role
CREATE TRIGGER role_insert_trigger
AFTER INSERT ON role
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for role
CREATE TRIGGER role_update_trigger
AFTER UPDATE ON role
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for role
CREATE TRIGGER role_delete_trigger
AFTER DELETE ON role
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for role_permission
CREATE TRIGGER role_permission_insert_trigger
AFTER INSERT ON role_permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for role_permission
CREATE TRIGGER role_permission_update_trigger
AFTER UPDATE ON role_permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for role_permission
CREATE TRIGGER role_permission_delete_trigger
AFTER DELETE ON role_permission
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for sts
CREATE TRIGGER sts_insert_trigger
AFTER INSERT ON sts
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for sts
CREATE TRIGGER sts_update_trigger
AFTER UPDATE ON sts
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for sts
CREATE TRIGGER sts_delete_trigger
AFTER DELETE ON sts
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for transportation
CREATE TRIGGER transportation_insert_trigger
AFTER INSERT ON transportation
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for transportation
CREATE TRIGGER transportation_update_trigger
AFTER UPDATE ON transportation
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for transportation
CREATE TRIGGER transportation_delete_trigger
AFTER DELETE ON transportation
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for user_contractor_company
CREATE TRIGGER user_contractor_company_insert_trigger
AFTER INSERT ON user_contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for user_contractor_company
CREATE TRIGGER user_contractor_company_update_trigger
AFTER UPDATE ON user_contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for user_contractor_company
CREATE TRIGGER user_contractor_company_delete_trigger
AFTER DELETE ON user_contractor_company
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for vehicle
CREATE TRIGGER vehicle_insert_trigger
AFTER INSERT ON vehicle
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for vehicle
CREATE TRIGGER vehicle_update_trigger
AFTER UPDATE ON vehicle
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for vehicle
CREATE TRIGGER vehicle_delete_trigger
AFTER DELETE ON vehicle
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for workforce
CREATE TRIGGER workforce_insert_trigger
AFTER INSERT ON workforce
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the update trigger for workforce
CREATE TRIGGER workforce_update_trigger
AFTER UPDATE ON workforce
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the delete trigger for workforce
CREATE TRIGGER workforce_delete_trigger
AFTER DELETE ON workforce
FOR EACH ROW
EXECUTE FUNCTION log_activity();

-- Create the insert trigger for workforce_log
CREATE TRIGGER workforce_log_insert_trigger
AFTER INSERT ON workforce_log
FOR EACH ROW
EXECUTE FUNCTION log_activity();
