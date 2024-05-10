CREATE OR REPLACE FUNCTION calculate_flag_score_and_update_status()
RETURNS TRIGGER AS $$
BEGIN
    NEW.flag_score := (
        SELECT COALESCE(SUM(bw.weight))
        FROM unnest(regexp_split_to_array(lower(NEW.content), '\W+')) w
        JOIN blocked_words bw ON w = bw.word
    );

    IF NEW.flag_score > 1 THEN
        NEW.status := 'inappropriate';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_flag_score_and_status
BEFORE INSERT OR UPDATE ON post
FOR EACH ROW
EXECUTE FUNCTION calculate_flag_score_and_update_status();

