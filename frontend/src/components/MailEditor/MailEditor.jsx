import { useRef, useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  ListGroup,
  CloseButton,
} from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const MailEditor = () => {
  const editorRef = useRef(null);
  const [from, setFrom] = useState(""); // user email from localStorage or blank
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch user email from localStorage on mount
  useEffect(() => {
    const email = window.localStorage.getItem("userEmail") || "";
    setFrom(email);
  }, []);

  const handleEditorChange = (content) => setBody(content);

  const handleFileChange = (e) => {
    // Append new files to existing files array
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
    // Reset input to allow selecting same files again
    e.target.value = null;
  };

  // Remove individual file by index
  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields only (From, To, Subject, Body)
    if (!from.trim() || !to.trim() || !subject.trim() || !body.trim()) {
      setError("From, To, Subject, and Message are required.");
      return;
    }

    // Prepare FormData for sending files
    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", to);
    if (cc.trim()) formData.append("cc", cc);
    if (bcc.trim()) formData.append("bcc", bcc);
    formData.append("subject", subject);
    formData.append("body", body); // HTML content from TinyMCE
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Replace this URL with your actual backend API
      await axios.post("https://your-api-url.com/sendmail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Mail sent!");
      // Clear form fields
      setTo("");
      setCc("");
      setBcc("");
      setSubject("");
      setBody("");
      setFiles([]);
      if (editorRef.current) editorRef.current.setContent("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Mail could not be sent. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={10} lg={8} xl={7}>
            <Card
              className="p-4 shadow-lg"
              style={{
                borderRadius: "1rem",
                animation: "fadeInUp 0.6s ease forwards",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Card.Body>
                <h2
                  className="mb-4 text-center"
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    color: "#2c3e50",
                    letterSpacing: "1.2px",
                  }}
                >
                  Compose Mail
                </h2>
                {error && (
                  <Alert variant="danger" className="shadow-sm">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="shadow-sm">
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  {/* FROM */}
                  <Form.Group className="mb-3" controlId="fromInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      From
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Sender's email"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                      style={{ boxShadow: "none" }}
                    />
                  </Form.Group>

                  {/* TO */}
                  <Form.Group className="mb-3" controlId="toInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      To
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Recipient emails, separate multiple with commas"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                      style={{ boxShadow: "none" }}
                    />
                  </Form.Group>

                  {/* CC (Optional) */}
                  <Form.Group className="mb-3" controlId="ccInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      CC <span style={{ fontWeight: "400", fontSize: "0.85rem", color: "#7a7a7a" }}>(Optional)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CC emails, separate multiple with commas"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      style={{ boxShadow: "none" }}
                    />
                    <Form.Text className="text-muted">Optional</Form.Text>
                  </Form.Group>

                  {/* BCC (Optional) */}
                  <Form.Group className="mb-3" controlId="bccInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      BCC <span style={{ fontWeight: "400", fontSize: "0.85rem", color: "#7a7a7a" }}>(Optional)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="BCC emails, separate multiple with commas"
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      style={{ boxShadow: "none" }}
                    />
                    <Form.Text className="text-muted">Optional</Form.Text>
                  </Form.Group>

                  {/* SUBJECT */}
                  <Form.Group className="mb-3" controlId="subjectInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      Subject
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      style={{ boxShadow: "none" }}
                    />
                  </Form.Group>

                  {/* ATTACH FILES (Optional) */}
                  <Form.Group className="mb-3" controlId="fileInput">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      Attach Files <span style={{ fontWeight: "400", fontSize: "0.85rem", color: "#7a7a7a" }}>(Optional)</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ boxShadow: "none" }}
                    />
                    {files.length > 0 && (
                      <ListGroup horizontal className="mt-2 flex-wrap">
                        {files.map((file, idx) => (
                          <ListGroup.Item
                            key={file.name + idx}
                            className="d-flex align-items-center me-2 mb-2"
                            style={{
                              fontSize: "0.95rem",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "0.5rem",
                              backgroundColor: "#f0f0f0",
                            }}
                          >
                            <span
                              className="me-2"
                              title={file.name}
                              style={{
                                maxWidth: "150px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              📎 {file.name}
                            </span>
                            <CloseButton
                              aria-label={`Remove file ${file.name}`}
                              onClick={() => handleRemoveFile(idx)}
                            />
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Form.Group>

                  {/* MESSAGE BODY (TinyMCE Editor) */}
                  <Form.Group className="mb-4" controlId="bodyEditor">
                    <Form.Label style={{ fontWeight: "600", color: "#34495e" }}>
                      Message
                    </Form.Label>
                    <Editor
                      apiKey="ymy1cswekhawl7ge7r34rxnw2w0monmjtsv7c5pm9rtgff4o"
                      onInit={(_evt, editor) => (editorRef.current = editor)}
                      value={body}
                      init={{
                        height: 320,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table emoticons",
                          "codesample wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic underline forecolor backcolor | " +
                          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                          "link image emoticons | removeformat",
                        branding: false,
                        content_style:
                          "body { font-family: 'Segoe UI',Arial,sans-serif; font-size:1.07rem; }",
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    style={{
                      padding: "0.6rem 1.2rem",
                      fontSize: "1.1rem",
                      borderRadius: "0.6rem",
                      boxShadow: "0 4px 8px rgb(0 123 255 / 0.4)",
                      transition: "all 0.3s",
                    }}
                  >
                    Send Mail
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px);}
          100%{opacity:1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default MailEditor;
