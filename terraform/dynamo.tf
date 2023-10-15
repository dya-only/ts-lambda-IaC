# users table
resource "aws_dynamodb_table" "dynamo" {
  name = "DynamoUsers"
  billing_mode = "PROVISIONED"
  hash_key = "id"
  read_capacity  = 20
  write_capacity = 20

  attribute {
    name = "id"
    type = "S"
  }
}