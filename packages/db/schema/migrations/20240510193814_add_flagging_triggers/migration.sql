CREATE OR REPLACE FUNCTION calculate_flag_score_and_update_status()
RETURNS TRIGGER AS $$
BEGIN
    NEW.flag_score := (
        SELECT SUM(bw.weight)
        FROM unnest(string_to_array(NEW.content, ' ')) word
        JOIN blocked_words bw ON word = bw.word
    );

    IF NEW.flag_score > 1 THEN
        NEW.status := 'flagged';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_flag_score_and_status
BEFORE INSERT OR UPDATE ON post
FOR EACH ROW
EXECUTE FUNCTION calculate_flag_score_and_update_status();

