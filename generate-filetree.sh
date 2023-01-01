echo "{ \"files\": [" > src/cli/file-tree.json
ar=( $(find public/root -name *.md) )
last_path=${ar[${#ar[@]}-1]}

ITER=0
for path in "${ar[@]}"; do
  name=(${path/\/root\// })
  relative_path=(${name[${#name[@]}-1]})
  comma=""

  if [[ "$ITER" -lt $(expr ${#ar[@]} - 1) ]]
    then
    comma=","
  fi
  echo "\"$relative_path\"$comma" >> src/cli/file-tree.json
  ITER=$(expr $ITER + 1)
done

echo "]}" >> src/cli/file-tree.json

git add src/cli/file-tree.json