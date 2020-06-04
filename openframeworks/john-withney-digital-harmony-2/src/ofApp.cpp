#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){

}

//--------------------------------------------------------------
void ofApp::update(){
    
}

void render(int n, float seed, float minRadius, float maxRadius) {
    for(int i = 0; i < n; i++) {
        float phase = ofMap(i, 0, n, 0, TWO_PI);
        float radius = ofMap(sin(phase*seed), -1, 1, minRadius, maxRadius);
        float x = radius * cos(phase);
        float y = radius * sin(phase);
        ofDrawCircle(x, y, 3);
    }
}

void render(int n, float seed, float maxRadius) {
    for(int i = 0; i < n; i++) {
        float phase = ofMap(i, 0, n, 0, TWO_PI);
        float radius = ofMap(sin(phase*seed), -1, 1, 0, maxRadius);
        float x = radius * cos(phase);
        float y = radius * sin(phase);
        ofDrawCircle(x, y, 3);
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    float t = ofGetElapsedTimef()/5;
//    t = t * ofMap(sin(t), -1, 1, 0, 1);
    float phase = fmod(t, TWO_PI);
    float mod = ofMap(sin(phase), -1, 1, 0, 4);
    ofBackground(0);
    ofSetColor(250, 250, 0);
    ofPushMatrix();
    
    ofTranslate(ofGetWidth()/2, ofGetHeight()/2);
    ofRotateDeg(t);
    
    ofSetColor(0, 150, 250);
    render(36, 0+mod, 220, 300);
    ofPushMatrix();
    ofRotateDeg(180);
    render(36, 0+mod, 180, 280);
    ofPopMatrix();
    
    ofSetColor(150, 150, 0);
    render(720, 61+mod, 50, 180);
    for (int i = 0; i < 10; i++) {
        ofRotateDeg(2+t*5);
        render(360, 61+mod, 50, 180);
    }
    
    ofSetColor(250, 0, 80);
    render(64, 340+mod, 0, 30);
    
    ofPopMatrix();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
