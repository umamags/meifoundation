@echo off
del /s *_medium.jpg
for /r %%f in (*.jpg) do convertm "%%f"